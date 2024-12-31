import React, { useEffect, useState } from "react";
import { getFreeStatisticsShortLink , updateFreeShortLink} from "@utils/consumer";
import { Error } from "@components/status/Error";
import { Loaders } from "@components/status/Loaders";
import Delete from "./delete.png";
import "./views.css";

export const Views = () => {
  const [loading, setLoading] = useState(false);
  const [errorList, setErrorList] = useState({
    message: "",
    status: false,
  });
  const [updateRow, setUpdateRow] = useState(false);

  const [statistics, setStatistics] = useState([]);

  const deleteLink = (id) => {
    updateFreeShortLink(id, false)
      .then((response) => {
        setLoading(true);
        const newError = {
          ...errorList,
          status: false,
          message: "",
        };
        setErrorList(newError);
        setLoading(false);
        setUpdateRow((updateRow) => !updateRow);
      })
      .catch((error) => {
        const newError = {
          ...errorList,
          status: true,
          message: error.message,
        };
        setErrorList(newError);
        setLoading(false);
      });
  };

  const updateRowClick = (e) => {
    setUpdateRow((updateRow) => !updateRow);
  };

  useEffect(() => {
    getFreeStatisticsShortLink()
      .then(async (response) => {
        setLoading(true);
        const newError = {
          ...errorList,
          status: false,
          message: "",
        };
        const data  = await response.json();
        if (response.ok) {
          setErrorList(newError);
          setStatistics(data.data);
          setLoading(false);
        } 
        if (response.status === 404) {
          setLoading(false);
          setErrorList({
            ...errorList,
            status: false,
            message: data.message,
          });
          setStatistics([]);
        }

      })
      .catch((error) => {
        const newError = {
          ...errorList,
          status: true,
          message: error.message,
        };
        setErrorList(newError);
        setLoading(false);
      });
  }, [updateRow]);
  return (
    <>
      {loading ? (
        <Loaders />
      ) : errorList.status ? (
        <Error message={errorList.message} />
      ) : (
        <section className="component-views">
          <section className="component-views-main">
            <h2>List of generated links</h2>
            <section className="component-views-table">
              <table>
                <thead>
                  <tr>
                    <th>URL origin</th>
                    <th>URL short</th>
                    <th>Clicks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.map((link) => (
                    <tr key={link.link_id}>
                      <td>{link.url}</td>
                      <td
                      >
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={updateRowClick}
                        >
                          {link.path}
                        </a>
                      </td>
                      <td
                        style={{
                          alignItems: "center",
                          textAlign: "center",
                        }}

                        >
                        {link.count}
                        </td>
                      <td
                        style={{
                          height: "100%",
                        }}
                      >
                        <section
                        style={
                              {
                                flex: "1",
                                height: "100%",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }
                            }
                        >
                          <img
                            src={Delete}
                            alt="delete"
                            width="30px"
                            height="30px"
                            
                            onClick={() => deleteLink(link.link_id)}
                          />
                        </section>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        </section>
      )}
    </>
  );
};
