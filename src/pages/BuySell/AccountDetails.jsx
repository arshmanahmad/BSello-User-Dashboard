import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/mainCard.css";
import { toast } from "react-toastify";
import {
  MdOutlineComputer,
  MdArrowOutward,
  MdOutlineStar,
} from "react-icons/md";
import {
  FaIdCard,
  FaUsersViewfinder,
  FaDollarSign,
  FaRegClock,
  FaMoneyBillWave,
} from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { handleAccountReport } from "./fetch";

function AccountDetails() {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const [detailsBuy, setBuyDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [latestAccounts, setLatestAccounts] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const itemsPerPage = 3;

  // ✅ Accounts ko slice karo
  const paginatedAccounts = latestAccounts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // ✅ Total pages calculate karo
  const totalPages = Math.ceil(latestAccounts.length / itemsPerPage);

  // ✅ Fetch Single Account Details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/buySellList/${accountId}`
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok. Status: ${response.status}, Message: ${errorText}`
          );
        }
        const data = await response.json();
        setBuyDetails(data);
      } catch (error) {
        toast.error(`Error fetching account details: ${error.message}`);
      }
    };

    if (accountId) {
      fetchData();
    }
  }, [accountId]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/buySellList/all`
        );
        const data = await res.json();
        setLatestAccounts(data); 
      } catch {
        toast.error("Error loading latest accounts");
      }
    };
    fetchLatest();
  }, []);

  if (!detailsBuy) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main_container_scammer_page_four">
      <div className="top">
        {/* ---------- Left Side: Images + Dots ---------- */}
        <div className="image_and_dot">
          <img src={detailsBuy.images[currentImageIndex]} alt="account-img" />

          <div className="buttons">
            {detailsBuy.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  backgroundColor:
                    currentImageIndex === index ? "black" : "transparent",
                }}
              ></button>
            ))}
          </div>

          {/* ✅ Fullscreen Toggle Button */}
          <button
            className="full_screen_view_button"
            onClick={() => setIsFullscreen(true)}
          >
            <span>
              Full screen view <MdOutlineComputer />
            </span>
          </button>
        </div>

        {/* ---------- Center Section ---------- */}
        <div className="center">
          <h1>{detailsBuy.accountName}</h1>
          <hr />
          <div className="details_grid">
            <div className="detail_item">
              <FaIdCard size={35} />
              <span>Account ID: {detailsBuy.accountId}</span>
            </div>

            <div className="detail_item">
              <RxHamburgerMenu size={30} />
              <span>Account Age: {detailsBuy.siteAge}</span>
            </div>

            <div className="detail_item">
              <FaUsersViewfinder size={30} />
              <span>Monthly Views: {detailsBuy.PageViews}</span>
            </div>

            <div className="detail_item">
              <FaDollarSign size={30} />
              <span>Monetization: {detailsBuy.monetizationEnabled}</span>
            </div>

            <div className="detail_item">
              <VscWorkspaceTrusted size={30} />
              <span>Seller: Trusted</span>
            </div>

            <div className="detail_item full_width">
              <FaRegClock size={30} />
              <span>
                Listing Date:{" "}
                {new Date(detailsBuy.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Right Section ---------- */}
        <div className="right">
          <button
            className="buy_now_and_need_help_btn"
            onClick={() => navigate("/payment")}
          >
            Buy Now
          </button>

          <button
            className="bidding_report_acc_already_sell_acc_btn"
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("user"));
              if (user) {
                handleAccountReport(
                  detailsBuy.accountId,
                  [detailsBuy],
                  (updated) => setBuyDetails(updated[0])
                );
              } else {
                toast.error("You must be logged in to report an account.");
              }
            }}
          >
            Report Acc.
            <span className="badge_red">{detailsBuy.reportAccount}</span>
          </button>

          <button
            className="buy_now_and_need_help_btn"
            onClick={() =>
              navigate("https://chat.whatsapp.com/CgwgYt1Pl6e84oZHA2Uy1K")
            }
          >
            Need Help? DM
          </button>
          <hr />
          <p>Seller Information</p>
          <button className="profile_btn">
            <span>
              <CgProfile size={35} />
            </span>
            <div className="name_and_rating">
              <div className="stars">
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <span>{detailsBuy.sellerDetails?.SellerFullName}</span>
              <div className="other_icons">
                <VscWorkspaceTrusted size={25} />
                <BsFillPersonCheckFill size={25} color="green" />
                <FaMoneyBillWave size={25} color="gold" />
              </div>
            </div>
            <span>
              <MdArrowOutward size={35} />
            </span>
          </button>
          <button className="bidding_report_acc_already_sell_acc_btn">
            Already Sell Acc.<span className="badge_green">0</span>
          </button>
        </div>
      </div>

      {/* ---------- Account Description ---------- */}
      <div className="center_two">
        <h2>Account Description</h2>
        <p>{detailsBuy.accountDesc}</p>
      </div>

      <hr />

      <div className="bottom_section">
        <h2>Latest Accounts</h2>
        <div className="account_list">
          {paginatedAccounts.map((acc) => (
            <div
              className="account_card"
              key={acc.accountId}
              onClick={() => navigate(`/BuySell/${acc.accountId}`)}
            >
              <div className="account_circle">
                <img
                  src={
                    acc.images && acc.images.length > 0
                      ? acc.images[0]
                      : "/no-image.png"
                  }
                  alt="latest-account"
                />
                <div className="account_badge">{acc.accountId}</div>
              </div>
              <p>{acc.accountName}</p>
            </div>
          ))}
        </div>

        {/* ✅ Pagination Dots */}
        <div className="pagination_buttons">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={currentPage === i ? "active" : ""}
            ></button>
          ))}
        </div>
      </div>

      {/* ✅ Fullscreen Modal */}
      {isFullscreen && (
        <div className="fullscreen_modal">
          <div className="fullscreen_content">
            <img
              src={detailsBuy.images[currentImageIndex]}
              alt="fullscreen-img"
            />
            <div className="buttons">
              {detailsBuy.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                    backgroundColor:
                      currentImageIndex === index ? "black" : "transparent",
                  }}
                ></button>
              ))}
            </div>
            <button
              className="close_fullscreen"
              onClick={() => setIsFullscreen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountDetails;
