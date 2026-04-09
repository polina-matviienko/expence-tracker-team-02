import Image from 'next/image';
import css from './AllUsers.module.css';

const avatars = ['/img/avatar1.webp', '/img/avatar2.webp', '/img/avatar3.webp'];

export default function AllUsersTab() {
  return (
    <div className={css.tab}>
      <div className={css.avatars}>
        {avatars.map((src, i) => (
          <Image
            key={i}
            src={src}
            width={125}
            height={48}
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
