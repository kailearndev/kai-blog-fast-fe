import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex justify-center items-center  flex-col">
      <h1 className="text-3xl font-bold mb-4">404 - Trang không tìm thấy</h1>
      <p className="text-lg">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại
        đường dẫn hoặc quay lại trang chủ.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="text-white hover:underline p-2 bg-blue-400 rounded-2xl mt-4"
        >
          Về trang chủ
        </Link>
        {/* <Link
        onNavigate={(e) => e.}
          className="text-black hover:underline p-2 bg-amber-100 rounded-2xl mt-4"
        >
          Quay lại trang trước
        </Link> */}
      </div>
    </section>
  );
}
