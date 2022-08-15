import React, { useState } from "react";
import InfoModal from "@components/InfoModal/InfoModal";
import "./heart.scss";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";

// MOCK
let mockFavSize = 1;

const Heart = ({ isFavorite }: { isFavorite: boolean }) => {
  const { active } = useAppSelector(selectUserData);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isFav, setIsFav] = useState(isFavorite);

  const handleFavoriteClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    // remove from favorites here
    if (isFav) {
      setIsFav(false);
      mockFavSize -= 1;
      return;
    }
    // // WARN >=1 just for testing, set to 3 later
    if (mockFavSize >= 1 && active === false) {
      setShowLimitModal(true);
    } else {
      // add to favorites here
      setIsFav(true);
      mockFavSize += 1;
    }
  };

  return (
    <>
      <svg
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="heart"
        onClick={handleFavoriteClick}
      >
        {isFav ? (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.001 2.30781C13.1996 1.28364 14.6171 0.481822 16.1183 0.189959C17.9807 -0.172137 19.9135 0.268577 21.547 1.90271C23.2376 3.59268 23.7594 5.47132 23.4226 7.3663C23.1 9.1809 22.0098 10.9064 20.7169 12.4442C19.4122 13.9961 17.8166 15.4539 16.3553 16.7244C15.9145 17.1077 15.4905 17.4703 15.0899 17.8128C14.1314 18.6324 13.307 19.3373 12.7072 19.9371C12.3167 20.3276 11.6835 20.3276 11.293 19.9371C10.7355 19.3796 9.95995 18.7134 9.0487 17.9306C8.6309 17.5716 8.18457 17.1882 7.71768 16.7796C6.26791 15.5106 4.67465 14.0425 3.36516 12.4778C2.06766 10.9273 0.967841 9.1885 0.628757 7.3702C0.274685 5.47152 0.770521 3.58534 2.45298 1.90288C4.1138 0.242066 6.05237 -0.198402 7.91669 0.176498C9.41261 0.477316 10.816 1.29014 12.001 2.30781Z"
            fill="#D00683"
          />
        ) : (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.001 2.30787C13.1996 1.2837 14.6171 0.481883 16.1183 0.19002C17.9807 -0.172076 19.9135 0.268638 21.547 1.90278C23.2376 3.59274 23.7594 5.47138 23.4226 7.36636C23.1 9.18096 22.0098 10.9065 20.7169 12.4443C19.4122 13.9961 17.8166 15.454 16.3553 16.7245C15.9145 17.1078 15.4905 17.4703 15.0899 17.8129C14.1314 18.6324 13.307 19.3374 12.7072 19.9372C12.3167 20.3277 11.6835 20.3277 11.293 19.9372C10.7355 19.3797 9.95995 18.7134 9.0487 17.9306C8.6309 17.5717 8.18457 17.1883 7.71768 16.7796C6.26791 15.5107 4.67465 14.0426 3.36516 12.4778C2.06766 10.9274 0.967841 9.18856 0.628757 7.37026C0.274685 5.47158 0.770521 3.5854 2.45298 1.90294C4.1138 0.242127 6.05237 -0.198341 7.91669 0.176559C9.41261 0.477377 10.816 1.2902 12.001 2.30787ZM7.5224 2.13731C6.28879 1.88924 5.03647 2.14788 3.8672 3.31716C2.6403 4.54405 2.36445 5.76805 2.59486 7.00361C2.84026 8.31955 3.6811 9.73903 4.89893 11.1943C6.10477 12.6352 7.60151 14.02 9.03493 15.2747C9.45334 15.6409 9.87187 16.0005 10.2764 16.3481C10.9015 16.8851 11.4931 17.3935 11.9995 17.8534C12.5474 17.3549 13.1878 16.8073 13.8606 16.232C14.2478 15.9009 14.6458 15.5606 15.0431 15.2152C16.4899 13.9572 17.9868 12.5836 19.186 11.1572C20.397 9.71684 21.2222 8.31734 21.4534 7.01631C21.6704 5.79578 21.3844 4.56796 20.1331 3.31732C18.995 2.1786 17.7456 1.91109 16.5 2.15326C15.2007 2.40589 13.8539 3.23044 12.7072 4.37716C12.3167 4.76768 11.6835 4.76768 11.293 4.37716C10.1493 3.23351 8.81498 2.39724 7.5224 2.13731Z"
            fill="#D00683"
          />
        )}
      </svg>

      <InfoModal
        type="reached-limit"
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
      />

      {/* <Modal isOpen={showLimitModal} onRequestClose={() => setShowLimitModal(false)}>
        <div>Limit</div>
      </Modal> */}
    </>
  );
};

export default Heart;
