function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell flex flex-col items-center justify-between gap-2 py-6 text-center text-sm text-slate-600 sm:flex-row">
        <p>© {new Date().getFullYear()} DriveGo. All rights reserved.</p>
        <p>Affordable and reliable car rentals in the Philippines.</p>
      </div>
    </footer>
  )
}

export default Footer

