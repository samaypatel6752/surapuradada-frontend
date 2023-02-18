import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import {useNavigate} from 'react-router-dom'
const Admin = () => {
  const api = "https://surapuradada.vercel.app/";
  const [pass, setpass] = useState("");
  const [work, setwork] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [sel1, setSel1] = useState(1);
  const [refresh1, setRefresh1] = useState(0);
  const [refresh2, setRefresh2] = useState(0);
  
  const [sel2, setSel2] = useState("");
  const [search1, setSearch1] = useState("");
  const [epd,setepd] = useState("");
  const [search2, setSearch2] = useState("");
  const [loading, setLoading] = useState(false);
  const [sel3, setSel3] = useState("");
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const checkPass = (e) => {
    e.preventDefault()
    if (pass == "6752") {
      setwork(false);
    } else {
    }
  };
  const changeEntry = async (e) => {
    setLoading(true);
    e.preventDefault();
    await fetch("https://surapuradada.vercel.app/api/updateentry", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "samay@6751@guru@bapasitaram_9898134603",
        entry: service,
        epd:epd
      }),
    })

  };
  useEffect(() => {
    setLoading(true);
    const getService = async () => {
      const data = await fetch(api + "api/check")
        .then((response) => response.json())
        .then((json) => {
          
          setepd(json.epd)
          if (json.entry == "on") {
            setService(true);
          } else {
            setService(false);
          }
        });
    };
    getService();
    setLoading(false);
  }, []);
  useEffect(() => {
    const getTodayEntry = async () => {
      setLoading(true);
      await fetch(api + "api/todayentry", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "samay@6751@guru@bapasitaram_9898134603",
        }),
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.type == "error") {
            setwork(true);
            setLoading(false);
          } else {
            setData(json.data);
            setLoading(false);
          }
        });
    };
    getTodayEntry();
  }, [refresh1]);
  useEffect(() => {
    const getAllEntry = async () => {
      setLoading(true);
      await fetch(api + "api/allentry", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "samay@6751@guru@bapasitaram_9898134603",
        }),
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.type == "error") {
            setwork(true);
            setLoading(false);
          } else {
            setData2(json.data);
            setLoading(false);
          }
        });
    };
    getAllEntry();
  }, [refresh2]);
  const convertDate = (date) => {
    var today = new Date(date);
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 1;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const Ndate = yyyy + "-" + mm + "-" + dd;
    return Ndate;
  };
  const updateR = async (name, phNo, date, tokenId, q) => {
    setLoading(true);

    await fetch(api + "api/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        phNo,
        date,
        tokenId,
        q,
        key: "samay@6751@guru@bapasitaram_9898134603",
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.type=="error"){
          setRefresh1(refresh1+1)
          setRefresh2(refresh2+1)
        }
      });
  };

  const deleteR = async (name, phNo, date, tokenId, q) => {
    setLoading(true);

    await fetch(api + "api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        phNo,
        date,
        tokenId,
        q,
        key: "samay@6751@guru@bapasitaram_9898134603",
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.type=="error"){
          setRefresh1(refresh1+1)
          setRefresh2(refresh2+1)
        }
      });
  };
  return (
    <>
      {loading ? <Loading /> : ""}
      <div id="admin">
        {work ? (
          <>
            <div id="home">
              <div id="reg">
                <form
                  onSubmit={(e) => {
                    checkPass(e);
                  }}
                >
                  <div className="input-group input-group-lg">
                    <h3>Enter Password </h3>
                  </div>
                  <br />
                  <div className="input-group input-group-lg">
                    <input
                      type="password"
                      className="form-control"
                      aria-label="Sizing example input"
                      placeholder="Enter Admin passowrd"
                      value={pass}
                      autoFocus
                      onChange={(e) => {
                        setpass(e.target.value);
                      }}
                      aria-describedby="inputGroup-sizing-lg"
                    />
                  </div>

                  <br />
                  <div className="input-group input-group-lg">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(e) => {
                        checkPass(e);
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div id="panel">
              <div id="heading">
                &nbsp;&nbsp;&nbsp;<i style={{fontSize:'20px',cursor:"pointer"}} onClick={()=>{navigate("/")}} className="fa-solid fa-house"></i>
                <h3>Admin Panel</h3>
                <p>
                  &copy; Developed by
                  <b>
                    <i> Samay Patel</i>
                  </b>
                </p>
              </div>
              <div id="form">
                <h4>Booking</h4>

                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Entry per day
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter entries per day"
                      aria-describedby="emailHelp"
                      value={epd}
                      onChange={(e)=>{setepd(e.target.value)}}
                    />
              
                  </div>
                  <div className="mb-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        onChange={() => {
                          setService(!service);
                        }}
                        id="flexSwitchCheckChecked"
                        checked={service}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        {service ? "Booking is on" : "Booking is off"}
                      </label>
                    </div>
                  </div>

                  <button type="submit" onClick={(e)=>{changeEntry(e);setLoading(false)}} className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
              <div id="body">
                <div
                  className="btn-group"
                  id="sel1"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSel1(1);
                      setRefresh1(refresh1 + 1);
                    }}
                    className={`btn btn-${sel1 == 2 ? "outline-" : ""}primary`}
                  >
                    Today Bookings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSel1(2);
                      setRefresh2(refresh2 + 1);
                    }}
                    className={`btn btn-${sel1 == 1 ? "outline-" : ""}primary`}
                  >
                    All Bookings
                  </button>
                </div>
                {sel1 == 1 ? (
                  <>
                    {data ? (
                      <>
                        <div id="place">
                          <h2>Today's Bookings</h2>
                        </div>
                        <div id="info">
                          <p
                            onClick={() => {
                              setSel2("");
                              setSearch1("");
                            }}
                            className={`${sel2 == "" ? "yes" : ""}`}
                          >
                            All
                            <h3>{data.length}</h3>
                          </p>
                          <p
                            onClick={() => {
                              setSel2("c");
                              setSearch1("");
                            }}
                            className={`${sel2 == "c" ? "yes" : ""}`}
                          >
                            Completed
                            <h3>
                              {
                                data.filter((item) => {
                                  return item.task == "c";
                                }).length
                              }
                            </h3>
                          </p>
                          <p
                            onClick={() => {
                              setSel2("n");
                              setSearch1("");
                            }}
                            className={`${sel2 == "n" ? "yes" : ""}`}
                          >
                            Remaning
                            <h3>
                              {
                                data.filter((item) => {
                                  return item.task == "n";
                                }).length
                              }
                            </h3>
                          </p>
                        </div>
                        <div id="search">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                              <i className="fa-regular fa-magnifying-glass"></i>
                            </span>
                            <input
                              type="number"
                              className="form-control"
                              value={search1}
                              onChange={(e) => {
                                setSearch1(e.target.value);
                              }}
                              placeholder="Enter phone number"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                            {search1 ? (
                              <button
                                className="input-group-text"
                                onClick={() => {
                                  setSearch1("");
                                }}
                              >
                                <i className="fa-regular fa-xmark"></i>
                              </button>
                            ) : (
                              ""
                            )}
                            <span className="input-group-text" id="basic-addon1">
                              {
                                data
                                  .filter((item) => item.phNo.includes(search1))
                                  .filter((item) => item.task.includes(sel2))
                                  .length
                              }
                            </span>
                          </div>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th>Token No.</th>
                              <th>Name</th>
                              <th>Phone No.</th>
                              <th>Village Name</th>
                              <th>Booking Date</th>
                              <th>Completed</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          {data
                            .filter((item) => item.phNo.includes(search1))
                            .filter((item) => item.task.includes(sel2))
                            .map((item, key) => {
                              return (
                                <tr key={key}>
                                  <td data-column="Token No.">
                                    {item.tokenId}
                                  </td>
                                  <td data-column="Name">{item.name}</td>
                                  <td data-column="Phone No.">{item.phNo}</td>
                                  <td data-column="Village Name.">
                                    {item.village}
                                  </td>
                                  <td data-column="Booking Date">
                                    {convertDate(item.date)}
                                  </td>
                                  <td data-column="Completed">
                                    {item.task == "n" ? "No" : "Yes"}
                                  </td>
                                  <td data-column="Action">
                                    <div
                                      className="btn-group"
                                      role="group"
                                      aria-label="Basic example"
                                    >
                                      <button
                                        type="button"
                                        className={`btn btn-${
                                          item.task == "n" ? "outline-" : ""
                                        }success`}
                                        onClick={() => {
                                          updateR(
                                            item.name,
                                            item.phNo,
                                            item.date,
                                            item.tokenId,
                                            "c"
                                          );
                                        }}
                                      >
                                        <i className="fa-regular fa-check"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className={`btn btn-outline-danger`}
                                        onClick={() => {
                                          deleteR(
                                            item.name,
                                            item.phNo,
                                            item.date,
                                            item.tokenId,
                                            item.task
                                          );
                                        }}
                                      >
                                        <i class="fa-regular fa-trash"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className={`btn btn-${
                                          item.task == "c" ? "outline-" : ""
                                        }primary`}
                                        onClick={() => {
                                          updateR(
                                            item.name,
                                            item.phNo,
                                            item.date,
                                            item.tokenId,
                                            "n"
                                          );
                                        }}
                                      >
                                        <i className="fa-regular fa-xmark"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </table>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    {data2 ? (
                      <>
                        <div id="place">
                          <h2>All Bookings</h2>
                        </div>
                        <div id="info">
                          <p
                            onClick={() => {
                              setSel3("");
                            }}
                            className={`${sel3 == "" ? "yes" : ""}`}
                          >
                            All
                            <h3>{data2.length}</h3>
                          </p>
                          <p
                            onClick={() => {
                              setSel3("c");
                            }}
                            className={`${sel3 == "c" ? "yes" : ""}`}
                          >
                            Completed
                            <h3>
                              {
                                data2.filter((item) => {
                                  return item.task == "c";
                                }).length
                              }
                            </h3>
                          </p>
                          <p
                            onClick={() => {
                              setSel3("n");
                            }}
                            className={`${sel3 == "n" ? "yes" : ""}`}
                          >
                            Remaning
                            <h3>
                              {
                                data2.filter((item) => {
                                  return item.task == "n";
                                }).length
                              }
                            </h3>
                          </p>
                        </div>
                        <div id="search">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                              <i className="fa-regular fa-magnifying-glass"></i>
                            </span>
                            <input
                              type="number"
                              className="form-control"
                              value={search2}
                              onChange={(e) => {
                                setSearch2(e.target.value);
                              }}
                              placeholder="Enter phone number"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                            {search2 ? (
                              <button
                                className="input-group-text"
                                onClick={() => {
                                  setSearch2("");
                                }}
                              >
                                <i className="fa-regular fa-xmark"></i>
                              </button>
                            ) : (
                              ""
                            )}
                            <span className="input-group-text" id="basic-addon1">
                              {
                                data2
                                  .filter((item) => item.phNo.includes(search2))
                                  .filter((item) => item.date.includes(date))
                                  .filter((item) => item.task.includes(sel3))
                                  .length
                              }
                            </span>
                          </div>
                        </div>
                        <div id="search">
                          <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                              <i className="fa-regular fa-calendar-days"></i>
                            </span>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Username"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              value={date}
                              onChange={(e) => {
                                setDate(e.target.value);
                              }}
                            />
                            {date ? (
                              <button
                                className="input-group-text"
                                onClick={() => {
                                  setDate("");
                                }}
                              >
                                <i className="fa-regular fa-xmark"></i>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th>Token No.</th>
                              <th>Name</th>
                              <th>Phone No.</th>
                              <th>Village Name</th>
                              <th>Booking Date</th>
                              <th>Completed</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          {data2
                            .filter((item) => item.phNo.includes(search2))
                            .filter((item) => item.date.includes(date))
                            .filter((item) => item.task.includes(sel3))
                            .map((item, key) => {
                              return (
                                <tr key={key}>
                                  <td data-column="Token No.">
                                    {item.tokenId}
                                  </td>
                                  <td data-column="Name">{item.name}</td>
                                  <td data-column="Phone No.">{item.phNo}</td>
                                  <td data-column="Village Name.">
                                    {item.village}
                                  </td>
                                  <td data-column="Booking Date">
                                    {convertDate(item.date)}
                                  </td>
                                  <td data-column="Completed">
                                    {item.task == "n" ? "No" : "Yes"}
                                  </td>
                                  <td data-column="Action">
                                    <div
                                      className="btn-group"
                                      role="group"
                                      aria-label="Basic example"
                                    >
                                      <button
                                        type="button"
                                        className={`btn btn-${
                                          item.task == "n" ? "outline-" : ""
                                        }success`}
                                        onClick={() => {
                                          updateR(
                                            item.name,
                                            item.phNo,
                                            item.date,
                                            item.tokenId,
                                            "c"
                                          );
                                        }}
                                      >
                                        <i className="fa-regular fa-check"></i>
                                      </button>

                                      <button
                                        type="button"
                                        className={`btn btn-outline-danger`}
                                        onClick={() => {
                                          deleteR(
                                            item.name,
                                            item.phNo,
                                            item.date,
                                            item.tokenId,
                                            item.task
                                          );
                                        }}
                                      >
                                        <i class="fa-regular fa-trash"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className={`btn btn-${
                                          item.task == "c" ? "outline-" : ""
                                        }primary`}
                                        onClick={() => {
                                          updateR(
                                            item.name,
                                            item.phNo,
                                            item.date,
                                            item.tokenId,
                                            "n"
                                          );
                                        }}
                                      >
                                        <i className="fa-regular fa-xmark"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </table>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
