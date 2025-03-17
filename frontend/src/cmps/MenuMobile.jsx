
export function MenuMobile({showMenuMobile}) {
    console.log(showMenuMobile)
    return (
        <div className={`menu-mobile ${showMenuMobile ? '' : ''}`} >  
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
        </div>
    )
}
