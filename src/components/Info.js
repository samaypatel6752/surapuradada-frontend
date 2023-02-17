import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Loading from "./Loading";
const Info = () => {
  const [data, setData] = useState({});
  
  const navigate = useNavigate();
  useEffect(() => {
    const read= async()=> {
      let idb =await indexedDB.open("db", 1);
      idb.onsuccess =async () => {
        let res =await idb.result;
        let tx =await res.transaction("data", "readonly");
        let store =await tx.objectStore("data");
        let cursor =await store.openCursor();
        cursor.onsuccess =async () => {
          let curRes =await cursor.result;
          
          if (curRes==null){
            navigate("/")
          }
          if (curRes) {
            
            if (curRes.value) {
              if (curRes.value.name) {
                const RawData = curRes.value
                if (RawData) {
                  setData(RawData);
                  const verify = async () => {
                    if (RawData == null) {
                      navigate("/");
                    } else {
                      await fetch("https://surapuradada.vercel.app/api/verifier", {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name: RawData.name,
                          village: RawData.village,
                          phNo: RawData.phNo,
            
                          tokenId: RawData.tokenId,
                          date: RawData.date,
                          key: "samay@6751@guru@bapasitaram_9898134603",
                        }),
                      })
                        .then((data) => data.json())
                        .then((parsed) => {
                          
                          if (!parsed) {
                           const del = async()=> {
                              let idb =await indexedDB.open('db', 1)
                              idb.onsuccess =async () => {
                                  let res =await idb.result;
                                  let tx =await res.transaction('data', 'readwrite')
                                  let store =await tx.objectStore('data')
                                  await store.delete(curRes.key)
                                  await navigate("/");
                                  
                              }
                            }
                              del()
                          } else if (parsed.task == "c") {
                            const del = async()=> {
                              let idb =await indexedDB.open('db', 1)
                              idb.onsuccess =async () => {
                                  let res =await idb.result;
                                  let tx =await res.transaction('data', 'readwrite')
                                  let store =await tx.objectStore('data')
                                  await store.delete(curRes.key)
                                  await navigate("/");
                                  
                              }
                            }
                              del()
                          }
                        });
                    }
                  };
                  verify();
                } else {
                  navigate("/");
                }
              }
            }
          }
        };
      };
    }
    read();

    
  }, []);

  return (
    <>
      <div id="home">
        {data ? (
          <>
            <div id="reg">
              <div id="d1">
                <p>Token Number</p>
                <h1>{data.tokenId}</h1>
              </div>
              <div id="d2">
                <p>Name : {data.name}</p>
                <p>Village : {data.village}</p>
                <p>Phone Number : {data.phNo}</p>
                <p>Date of Regestration : {data.date}</p>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Info;
