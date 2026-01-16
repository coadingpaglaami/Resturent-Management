

export const AuthHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#1F14B1F2] mb-2">{title}</h2>
            <p className="text-[#1F14B1F2] text-sm">
                {subtitle}
            </p>
        </div>
    )
}