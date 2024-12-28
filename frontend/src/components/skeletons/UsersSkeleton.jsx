const SidebarSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array(10)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="w-full bg-slate-700 text-slate-50 font-medium py-2 px-4 rounded-lg animate-pulse"
          >
            <div className="flex items-center justify-between w-full">
              <div className="h-4 bg-slate-600 w-3/4 rounded-md"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SidebarSkeleton;
