import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].value;

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const storageRef = ref(storage, displayName);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async downloadURL => {
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL
                    });
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL
                    });
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");
                });
            });
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Register</span>
                <form onSubmit={handleSubmit}>
                    <input placeholder="name" type="text" />
                    <input placeholder="email" type="email" />
                    <input placeholder="password" type="password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">Add +</label>
                    <button>Sign up</button>
                    {error && <span>{error}</span>}
                </form>
                You do have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Register;
