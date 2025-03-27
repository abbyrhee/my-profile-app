
import { useRef } from "react";
import style from "../styles/card.module.css";
import PropTypes from "prop-types";
import { memo } from "react";

const Card = memo(({ image_url, name, title, email }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className={`${style["profile-card"]} ${style["is-entering"]}`}
    >
      <div className={style["profile-card__image"]}>
        <img src={image_url} alt={name} />
      </div>
      <div className={style["profile-card__content"]}>
        <p className={style["name"]}>{name}</p>
        <p className={style["title"]}>{title}</p>
        <p className={style["email"]}>{email}</p>
      </div>
    </div>
  );
});

// Add display name for debugging purposes
Card.displayName = 'Card';

Card.propTypes = {
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  email: PropTypes.string.isRequired
};
export default Card;
