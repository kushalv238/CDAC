export default function listenForOutsideClicks(
    listening,
    setListening,
    menuRef,
    buttonRef,
    popUpActive,
    setPopUpActive
) {
    return () => {
        console.log("1")
        if (listening || !menuRef.current) return;

        setListening(true)

        function handleEvents(evt, type) {
            const cur = menuRef.current
            const clickedNode = evt.target

            if((type === `keydown` && evt.keyCode === 84)) {
                setPopUpActive(true);
                return
            }

            if (cur.contains(clickedNode) || buttonRef.current.contains(clickedNode) || (type === `keydown` && evt.keyCode !== 27)) return

            setPopUpActive(false)
        }

        /*The semicolon before the mapping is used to ensure that if there is any code before this function,
        it will terminate correctly. Without the semicolon,
        it could lead to potential issues due to Automatic Semicolon Insertion (ASI).*/
        ;[`click`, `touchstart`, `keydown`].forEach((type) => {
            document.addEventListener(type, (evt)=>handleEvents(evt, type))
        })
    }
}