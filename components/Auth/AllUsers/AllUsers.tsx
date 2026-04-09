import Image from 'next/image';
import css from './AllUsers.module.css';

const avatars = ['/img/avatar1.jpg', '/img/avatar2.jpg', '/img/avatar3.jpg'];

export default function AllUsersTab() {
  return (
    <div className={css.tab}>
      <div className={css.avatars}>
        {avatars.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="User"
            className={css.avatar}
            style={{ transform: `translateX(-${i * 12}px)` }}
          />
        ))}
      </div>
      <div className={css.info}>
        <p className={css.count}>1,000 users +</p>
        <p className={css.text}>
          Trusted by users for reliable expense tracking!
        </p>
      </div>
    </div>
  );
}
