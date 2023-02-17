import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const Booking = () => {
  const api = "https://surapuradada.vercel.app/";
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [load, setLoad] = useState(false);
  const [phNo, setPhNo] = useState("");
  const [db, setDb] = useState(null);
  const [dataR, setDataR] = useState({});
  const navigate = useNavigate();

  

  useEffect(() => {
    const request = indexedDB.open('db', 1);
    request.onerror = function(event) {
      // console.log('Database error: ' + event.target.errorCode);
    };
    request.onsuccess = function(event) {
      // console.log('Database opened successfully');
      setDb(event.target.result);
    };
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore('data', { keyPath: 'id', autoIncrement:true });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('phNo', 'phNo', { unique: false });
      objectStore.createIndex('village', 'village', { unique: false });
      objectStore.createIndex('tokenId', 'tokenId', { unique: false });
      objectStore.createIndex('time', 'time', { unique: false });
      objectStore.createIndex('date', 'date', { unique: false });
      objectStore.createIndex('task', 'task', { unique: false });
    };
  }, []);
  
  function saveData(data) {
    const transaction = db.transaction(['data'], 'readwrite');
    const objectStore = transaction.objectStore('data');
    const request = objectStore.add(data);
    request.onsuccess = function(event) {
     navigate("/info")
    };
    request.onerror = function(event) {
      console.log('Error saving data: ' + event.target.errorCode);
    };
  }

  useEffect(() => {
    const getService = async () => {
      const data = await fetch("https://surapuradada.vercel.app/api/check")
        .then((response) => response.json())
        .then((json) => setService(json));
    };
    getService();
  }, []);
  useEffect(() => {
   const read = async ()=> {
      let idb =await indexedDB.open('db', 1)
      idb.onsuccess =async () => {
          let res =await idb.result;
          let tx =await res.transaction('data', 'readonly')
          let store =await tx.objectStore('data')
          let cursor =await store.openCursor()
          cursor.onsuccess =async () => {
              let curRes =await cursor.result;
              if (curRes){
                if (curRes.value){
                  if (curRes.value.name) {
                    navigate("/info")
                  }
                }
              }
              
   
          }
      }
  }
  read()
  }, []);

  const regester = async () => {
    setLoad(true);
    if (name == "") {
    } else {
      if (village == "") {
      } else {
        if (phNo == "") {
        } else {
          const request = await fetch(
            "https://surapuradada.vercel.app/api/book",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                village,
                phNo,
                key: "samay@6751@guru@bapasitaram_9898134603",
              }),
            }
          )
            .then((data) => data.json())
            .then((json) => {
              setDataR(json);
              if (json.type == "fail") {
                setService({ entry: "off" });
                setLoad(false);
              } else {
                setLoad(false);
                saveData(json.data)
                
              }
            });
        }
      }
    }
  };

  return (
    <>
      <div id="home">
        {service ? (
          <div id="reg">
            {service.entry == "on" ? (
              <>
                <div className="mb-3">
                  <h3>Registration</h3>
                </div>
                <div className="mb-3">
                  <label htmlFor="basic-url" className="form-label">
                    Your Name
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="basic-url"
                      placeholder="Your Name"
                      value={name}
                      autoComplete="off"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="basic-url" className="form-label">
                    Your Village
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="basic-url"
                      autoComplete="off"
                      placeholder="Village Name"
                      value={village}
                      onChange={(e) => {
                        setVillage(e.target.value);
                      }}
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="basic-url" className="form-label">
                    Your Phone Number
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id="basic-url"
                      autoComplete="off"
                      value={phNo}
                      onChange={(e) => {
                        setPhNo(e.target.value);
                      }}
                      placeholder="Format (1234567890)"
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      regester();
                    }}
                    className="btn btn-success"
                    disabled={load}
                  >
                    {load ? (
                      <div
                        className="spinner-border text-light spinner-border-sm"
                        role="status"
                      ></div>
                    ) : (
                      "Regestier"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div id="nSer">
                  <i className="fa-solid fa-triangle-exclamation"></i>

                  <p>
                    <h3>Sorry , Currently booking is unavailable </h3>
                    <center>Try to Register Tommorow</center>
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Booking;
