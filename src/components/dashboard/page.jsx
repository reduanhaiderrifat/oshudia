'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStarsFromDB, openEarnedDB } from '@/utility/IndexedDB';
import { collection, query, where, getDocs, updateDoc, addDoc, doc, Timestamp, orderBy } from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
const Dashboard = ({ encoded }) => {
    const { status, data: session } = useSession();
    const [star, setStart] = useState()
    const [userPoint, setUserPoint] = useState(0);
    const [data, setData] = useState({})
    const formRef = useRef();
    const router = useRouter();
    const userEmail = session?.user?.email;
    const [loading, setLoading] = useState(false);
    const [wuthdrawloader, setwithdrawloader] = useState(false)
    const [reports, setReports] = useState()

    const fetchData = useCallback(async () => {
        const stars = await getStarsFromDB();
        setStart(stars);
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const claimStars = async () => {
        if (!userEmail) {
            alert("You must be logged in.");
            return;
        }



        setLoading(true); // Start loading
        try {
            // Step 1: Get stars count from IndexedDB
            const dbLocal = await openEarnedDB();
            const tx = dbLocal.transaction("stars", "readonly");
            const store = tx.objectStore("stars");
            const allStars = await store.getAll();
            const claimedStars = allStars.length;

            // Step 2: Query Firestore for user by email
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast.error("User not found in Memory.");
                return;
            }

            // Step 3: Get current earn value and add claimedStars
            const userDoc = querySnapshot.docs[0];
            const currentEarn = userDoc.data().earn || 0;
            const newEarn = currentEarn + claimedStars;

            // Step 4: Update earn in Firestore
            await updateDoc(userDoc.ref, { earn: newEarn });

            // Step 5: Clear stars from IndexedDB
            const clearTx = dbLocal.transaction("stars", "readwrite");
            clearTx.objectStore("stars").clear();
            await clearTx.done;
            await fetchData()
            toast.success(`Claimed ${claimedStars} stars! Total: ${newEarn}`);
        } catch (error) {
            toast.error('something wrong try again later')
        } finally {
            setLoading(false)
        }
    };

    // 🔁 Redirect if session email doesn't match or not authenticated
    useEffect(() => {
        if (status === 'authenticated' && userEmail !== encoded) {
            router.push('/');
        }
    }, [status, userEmail, encoded, router]);

    const fetchStarData = useCallback(async () => {


        if (userEmail) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const point = userDoc.data().earn || 0;
                setUserPoint(point);
                setData(userDoc.data());
            }
        }
    }, [userEmail]);

    const fetchreport = async () => {
        const q = query(
            collection(db, 'statusReports'),
            orderBy('createdAt', 'desc') // 🔽 
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setReports(data[0]);
    };




    useEffect(() => {
        fetchStarData()
        fetchreport()
    }, [fetchStarData])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setwithdrawloader(true)
        const { nogadNumber, description } = data;
        const newData = {
            nogadNumber,
            description,
            email: userEmail,
            earn: userPoint,
            createdAt: Timestamp.now(),
        }

        try {
            // Step 1: Check if a withdrawal request already exists for this email
            const existingRequestQuery = query(
                collection(db, "withdrawRequests"),
                where("email", "==", userEmail)
            );
            const existingRequestSnapshot = await getDocs(existingRequestQuery);

            if (!existingRequestSnapshot.empty) {
                toast.error("A withdrawal request has already been submitted.");
                return;
            }
            await addDoc(collection(db, "withdrawRequests"), newData);
            // Find user's document
            const userRef = query(
                collection(db, "users"),
                where("email", "==", userEmail)
            );
            const userSnapshot = await getDocs(userRef);
            const userDoc = userSnapshot.docs[0];

            if (userDoc) {
                // Update earn to 0
                await updateDoc(doc(db, "users", userDoc.id), {
                    earn: 0
                });
                setUserPoint(0);
            }
            toast.success("Withdrawal request submitted!");
        } catch (error) {

            toast.error("Failed to submit request. Try again.");
        } finally {
            setwithdrawloader(false)
        }

    };
    const handleAcess = async (e) => {
        e.preventDefault();
        setLoading(true)
        const form = formRef.current;

        const data = {
            startDate: form.startDate.value,
            endDate: form.endDate.value,
            status: form.status.value,
            createdAt: Timestamp.now(),
        };
        try {
            await addDoc(collection(db, "statusReports"), data);

            toast.success("Form submitted successfully!");
            form.reset(); // Clear the form
        } catch (error) {

            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false)
        }

    };
    // ⏳ Show loading while session is being fetched or about to redirect
    if (status === 'loading' || (status === 'authenticated' && userEmail !== encoded)) {
        return <p className='text-center text-xl font-bold mt-20'>Loading...</p>;
    }

    // ✅ Show dashboard only if authenticated and email matches
    if (status === 'authenticated' && userEmail === encoded) {
        return (
            <div className='text-center mt-20'>
                <h2 className='text-2xl font-semibold'>{session?.user?.name}</h2>

                <p className='text-lg'>Email: {encoded}</p>

                <button
                    onClick={claimStars}
                    disabled={star < 200 || loading}
                    className={`btn mt-4  ${star < 200 ? 'opacity-50 text-black cursor-not-allowed' : 'bg-amber-400 text-white'}`}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <>claim : {star}/200</>
                    )}
                </button>
                <div className="flex flex-wrap gap-5 justify-center mt-8">
                    <a
                        className={`btn rounded-full ${process.env.NEXT_PUBLIC_DOMAIN
                            === "http://localhost:3000" ? "bg-[#0053a5] text-white" : ""
                            }`}
                        href="/"
                    >
                        server 1
                    </a>
                    <a className={`btn rounded-full ${process.env.NEXT_PUBLIC_DOMAIN
                        === "http://localhost:3000" ? "bg-[#0053a5] text-white" : ""
                        }`} href="/">server 2</a>
                    <a className={`btn rounded-full ${process.env.NEXT_PUBLIC_DOMAIN
                        === "http://localhost:3000" ? "bg-[#0053a5] text-white" : ""
                        }`} href="/">server 3</a>
                    <a className={`btn rounded-full ${process.env.NEXT_PUBLIC_DOMAIN
                        === "http://localhost:3000" ? "bg-[#0053a5] text-white" : ""
                        }`} href="/">server 4</a>
                    <a className={`btn rounded-full ${process.env.NEXT_PUBLIC_DOMAIN
                        === "http://localhost:3000" ? "bg-[#0053a5] text-white" : ""
                        }`} href="/">server 5</a>
                </div>
                   <p className='mt-5 text-red-600 font-bold'>At least 1000 point need to withdraw</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center w-full mt-8">
                 
                    <div className="space-y-4 w-full md:w-2/3 lg:w-1/3 px-2">
                        <label className="floating-label">
                            <span>Your Email</span>
                            <input value={userEmail} name='email' type="email" placeholder="mail@site.com" className="input input-md w-full cursor-not-allowed" readOnly />
                        </label>
                        <label className="floating-label">
                            <span>Your Nogad Number</span>
                            <input type="number" name='nogadNumber' {...register("nogadNumber", {
                                required: "Nogad number is required",
                                pattern: {
                                    value: /^\d{11}$/,
                                    message: "Nogad number must be exactly 11 digits"
                                }
                            })} placeholder="Your Nogad Number" className="input input-md w-full" />
                            {errors.nogadNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.nogadNumber.message}</p>
                            )}
                        </label>

                        <label className="floating-label">
                            <span>Your point</span>
                            <input type="number" placeholder="Your point" value={userPoint} className="input input-md w-full cursor-not-allowed" readOnly />
                        </label>
                        <label className="floating-label">
                            <span>Description (Optional)</span>
                            <textarea cols={12} rows={4} type="text" maxLength={30}  {...register('description', {
                                maxLength: {
                                    value: 30,
                                    message: 'Description must be 30 characters or fewer',
                                },
                            })} placeholder="Description (Optional)" className="textarea textarea-md w-full" />
                        </label>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                        {reports && reports?.status === "Okey" ? <>    {wuthdrawloader ? "Loading..." : <button disabled={!userEmail || !userPoint  || userPoint < 1000 || wuthdrawloader} type="submit" className="btn btn-primary w-full">{userPoint}/1000 Submit</button>}</> : <><p className='
                        text-red-500 font-semibold text-sm'>Withdraw will start ( {reports?.startDate} )and Last date is( {reports?.endDate
                            } )</p></>}


                    </div>
                </form>
                {data?.email === "reduanhaiderrifat@gmail.com" && data?.role === 'power' && session?.user?.role === 'power' &&



                    <div className="mt-14">


                        <form ref={formRef} onSubmit={handleAcess} className="space-y-4 max-w-md mx-auto p-4 border rounded ">
                            <div>
                                <label className="block mb-1">Start Date:</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    className="border px-2 py-1 w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">End Date:</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    className="border px-2 py-1 w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Status:</label>
                                <select name="status" className="border px-2 py-1 w-full" required>
                                    <option value="Okey">Okey</option>
                                    <option value="Not Okey">Not Okey</option>
                                </select>
                            </div>

                            <button disabled={loading} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </form>
                        <Link href={`/dashboard/admin/${userEmail}`} className="btn mt-24">Go for cash</Link>
                    </div>
                }

            </div>
        );
    }

    return null;
};

export default Dashboard;
