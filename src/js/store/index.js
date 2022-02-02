const store = {
    setLocalStorage (menu) {
        //JSON 객체를 문자형으로 저장
        localStorage.setItem("menu",JSON.stringify(menu));
    },
    getLocalStorage () {
        return JSON.parse(localStorage.getItem("menu"));
    },
};

export default store;