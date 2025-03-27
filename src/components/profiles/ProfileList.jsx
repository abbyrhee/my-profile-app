import { memo } from 'react';
import { Link } from "react-router-dom";
import Card from "../Card";
import styles from "../../styles/home.module.css";

const ProfileList = memo(({ profiles }) => {
  if (!Array.isArray(profiles)) {
    return null;
  }

  return (
    <div className={styles["profile-cards"]}>
      {profiles.map((profile) => (
        <Link to={`/profile/${profile.id}`} key={profile.id}>
          <Card {...profile} />
        </Link>
      ))}
    </div>
  );
});

export default ProfileList;