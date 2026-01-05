import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationsDummy } from "../../data/reservationsDummy.js";
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [visibleDateCount, setVisibleDateCount] = useState(2);

  const goToDetail = (id) => {
    navigate(`/reservation/detail/${id}`);
  };

  const groupedByDate = useMemo(() => {
    const map = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    reservationsDummy.forEach((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0);

      // ✅ 지난 날짜는 제외
      if (itemDate < today) return;

      if (!map[item.date]) {
        map[item.date] = [];
      }
      map[item.date].push(item);
    });

    return Object.entries(map)
      .map(([date, items]) => {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        return {
          date,
          items,
          diff: Math.abs(targetDate - today),
        };
      })
      .sort((a, b) => a.diff - b.diff); // 오늘 기준 가까운 순
  }, []);

  const visibleGroups = groupedByDate.slice(0, visibleDateCount);

  return (
    <div className="reservation-container">
      {visibleGroups.map((group) => (
        <div className="date-group" key={group.date}>
          <p className="date-title">{group.date}</p>

          <div className="reservation-list">
            {group.items.map((item) => (
              <div
                key={item.id}
                className="reservation-card"
                onClick={() => goToDetail(item.id)}
              >
                <div className="card-top">
                  <span className="time-badge">{item.time}</span>

                  {item.status && (
                    <span className="status-badge">{item.status}</span>
                  )}
                </div>

                <div className="card-content">
                  <p className="customer-name">
                    {item.name} <span>고객님</span>
                  </p>
                  <p className="address">{item.address}</p>
                  <p className="service">
                    {item.type} | <strong>{item.service}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  className="detail-btn"
                  onClick={() => goToDetail(item.id)}
                >
                  예약 상세보기
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {visibleDateCount < groupedByDate.length && (
        <button
          className="more-btn"
          onClick={() => setVisibleDateCount((prev) => prev + 2)}
        >
          더 보기
        </button>
      )}
    </div>
  );
};

export default ReservationPage;


