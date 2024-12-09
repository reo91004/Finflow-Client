import Navbar from './components/Navbar';

export default function AfterLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}