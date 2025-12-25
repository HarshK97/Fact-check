import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 lg:px-10 py-4 bg-surface-light dark:bg-surface-dark sticky top-0 z-50 shadow-md">
            <div className="flex items-center gap-3">
                <div className="text-primary bg-wood-dark p-1.5 rounded flex items-center justify-center shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform rounded-full"></div>
                    <span className="text-2xl relative z-10">♔</span>
                </div>
                <h2 className="text-xl font-display font-bold leading-tight tracking-tight text-wood-dark dark:text-primary">Fact-Chek</h2>
            </div>
            <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
                <div className="flex items-center gap-9 font-display">
                    <Link className="text-sm font-semibold leading-normal hover:text-primary transition-colors text-wood-medium dark:text-board-light flex items-center gap-2 group" href="#process">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs">♟</span>
                        The Strategy
                    </Link>
                    <Link className="text-sm font-semibold leading-normal hover:text-primary transition-colors text-wood-medium dark:text-board-light flex items-center gap-2 group" href="#features">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs">♟</span>
                        Tactics
                    </Link>
                    <Link className="text-sm font-semibold leading-normal hover:text-primary transition-colors text-wood-medium dark:text-board-light flex items-center gap-2 group" href="#">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs">♟</span>
                        Grandmaster Plan
                    </Link>
                </div>
                <div className="flex gap-3">
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 bg-transparent border border-wood-medium dark:border-wood-light hover:bg-wood-light/10 text-sm font-bold leading-normal transition-all text-wood-dark dark:text-board-light font-display">
                        <span className="truncate">Log In</span>
                    </button>
                    <Link href="/portfolio" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 bg-primary hover:bg-primary-hover text-wood-dark text-sm font-bold leading-normal shadow-md transition-all font-display group">
                        <span className="truncate flex items-center gap-2">Start Game <span className="text-lg group-hover:translate-x-1 transition-transform">♕</span></span>
                    </Link>
                </div>
            </div>
            <button className="lg:hidden text-wood-dark dark:text-primary">
                <span className="material-symbols-outlined">menu</span>
            </button>
        </header>
    );
}
