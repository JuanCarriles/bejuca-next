export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center">
            <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-[#3CB4D8]/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-[#3CB4D8] animate-spin" />
                </div>
                <p className="text-[#3CB4D8] text-sm font-medium animate-pulse">
                    Bejuca Consulting
                </p>
            </div>
        </div>
    );
}
