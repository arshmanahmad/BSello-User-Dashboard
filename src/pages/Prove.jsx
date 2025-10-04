import React, { useEffect, useState } from "react";
import "../css/proveUserPanel.css";
import { toast } from "react-toastify";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Prove = () => {
  const [proves, setProves] = useState([]);
  const [modalData, setModalData] = useState(null); // images for modal
  const [searchTerm, setSearchTerm] = useState(""); // search state

  const fetchProves = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${VITE_BASE_URL}/api/prove/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProves(data);
    } catch (error) {
      console.error("Failed to fetch proves:", error);
      toast.error("Failed to load proves");
    }
  };

  useEffect(() => {
    fetchProves();
  }, []);

const filteredProves = proves.filter((item) => {
  const dateStr = new Date(item.createdAt).toLocaleDateString(); 
  return (
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dateStr.includes(searchTerm) 
  );
});


  return (
    <div className="proveContainer">
      <h2>Prove List</h2>

      <div className="searchBtn">
        <div className="inputMain">
          <input
            type="text"
            placeholder="Search by Date 00/00/0xxx Name or Description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔍</button>
        </div>
      </div>

      <div className="tableWrapper">
        <table className="proveTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Images</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredProves.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No proves found
                </td>
              </tr>
            ) : (
              filteredProves.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td>
                    {item.images && item.images.length > 0 ? (
                      <button
                        className="viewBtn"
                        onClick={() => setModalData(item.images)}
                      >
                        View Images
                      </button>
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalData && (
        <div className="imageModal">
          <div
            className="imageModalOverlay"
            onClick={() => setModalData(null)}
          ></div>

          <div className="imageModalContent">
            <div className="imageList">
              {modalData.map((url, idx) => (
                <img key={idx} src={url} alt={`prove-${idx}`} />
              ))}
            </div>
          </div>

          <button
            className="imageModalClose"
            onClick={() => setModalData(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Prove;
