import CategoriesModal from '@/components/Modals/CategoriesModal/CategoriesModal';
import Header from '@/components/Layout/Header/Header';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: '40px' }}>
        {children}
      </main>
      <CategoriesModal />
    </>
  );
}




