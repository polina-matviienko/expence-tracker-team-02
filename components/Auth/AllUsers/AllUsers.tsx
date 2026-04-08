import css from './AllUsers.module.css';

const avatars = ['/img/avatar1.jpg', '/img/avatar2.jpg', '/img/avatar3.jpg'];
const getRandomNumber = (): number => {
  return Math.floor(Math.random() * (1001 - 967 + 1)) + 967;
};

export default function AllUsersTab() {
  return (
    <div className={css.tab}>
      <div className={css.avatars}>
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="User"
            className={css.avatar}
            style={{ transform: `translateX(-${i * 12}px)` }}
          />
        ))}
      </div>
      <div className={css.info}>
        <p className={css.count}>{getRandomNumber()} users +</p>
        <p className={css.text}>
          Trusted by users for reliable expense tracking!
        </p>
      </div>
    </div>
  );
}
