export default function AnimatedBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="bubble bubble-1" style={{ "--i": 1 } as any}>⭐</div>
            <div className="bubble bubble-2" style={{ "--i": 5 } as any}>📘</div>
            <div className="bubble bubble-3" style={{ "--i": 9 } as any}>⚪</div>
            <div className="bubble bubble-4" style={{ "--i": 14 } as any}>⭐</div>
            <div className="bubble bubble-5" style={{ "--i": 3 } as any}>📕</div>

            <div className="bubble bubble-6" style={{ "--i": 11 } as any}>📕</div>
            <div className="bubble bubble-7" style={{ "--i": 7 } as any}>⭐</div>
            <div className="bubble bubble-8" style={{ "--i": 16 } as any}>⚪</div>
            <div className="bubble bubble-9" style={{ "--i": 2 } as any}>📘</div>
            <div className="bubble bubble-10" style={{ "--i": 19 } as any}>⭐</div>

            <div className="bubble bubble-11" style={{ "--i": 22 } as any}>⭐</div>
            <div className="bubble bubble-12" style={{ "--i": 26 } as any}>📘</div>
            <div className="bubble bubble-13" style={{ "--i": 30 } as any}>⚪</div>
            <div className="bubble bubble-14" style={{ "--i": 18 } as any}>⭐</div>
            <div className="bubble bubble-15" style={{ "--i": 25 } as any}>📕</div>

        </div>
    );
}
