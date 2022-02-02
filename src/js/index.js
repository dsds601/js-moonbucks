// localStorage에 데이터 저장 -> 새로고침후에도 데이터 보존
//  - 데이터 저장
//  - 데이터 읽기

// 종류별 메뉴판 관리 기능
//  

// 페이지 최초 접근시 에스프레소 category default
// 품절버튼 -> sold-out class 추가하여 상태 변경


// $ 표시는 html에 DOM element를 가져올때 관용적으로 사용합니다. 
const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage (menu) {
        //JSON 객체를 문자형으로 저장
        localStorage.setItem("menu",JSON.stringify(menu));
    },
    getLocalStorage () {
        return JSON.parse(localStorage.getItem("menu"));
    },
};

function App(){
// 상태란? 변할 수 있는 데이터 (관리 필요)
// - 갯수 , 메뉴명
    this.menu = {
        espresso : [],
        frappuccino : [],
        blended : [],
        teavana : [],
        desert : [],
    };

    this.currentCategory = "espresso";

    this.init = () => {
        if(store.getLocalStorage()){
            this.menu = store.getLocalStorage();
        }
        render();
    }

    const render = () => {
        const template = this.menu[this.currentCategory]
        .map((menuItem,index) => {
                return `
                <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                    <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                    >
                        삭제
                    </button>
                </li>`;
        })
        .join("");  //<- 배열안에 객체 형태로 있는 html을 String 형태로 붙여줌 
        //[{<li></li>},{<li></li>},{<li></li>}] => [{lilili}]

        $('#menu-list').innerHTML = template;
        updateMenuCount();
    }

    const updateMenuCount = () => {
        $(".menu-count").innerText = `총 ${$("#menu-list").querySelectorAll("li").length}개`;
    }

    const addMenuName = () =>{
        if($('#menu-name').value.trim() === ''){
            alert("입력값이 빈 값입니다.");
            return;
        }
        const espressoMenuName = $('#menu-name').value;
        //menu 상태에 메뉴를 추가함
        this.menu[this.currentCategory].push({ name: espressoMenuName });
        store.setLocalStorage(this.menu);
        // -> '[{"name":"americano"},{"name":"latter"}]' JSON 형태로 저장
        render();
        $('#menu-name').value ='';
    };

    const updateMenuName = (e) =>{
            const menuId = e.target.closest("li").dataset.menuId
            //closest 제일 가까운 리스 태그 찾는다 그 엘레멘트속 menu- name 을 찾는다.
            const $menuName = e.target.closest("li").querySelector(".menu-name"); 
            //prompt 반환값 -> 수정된 value
            const updatedMenuName = prompt("메뉴명을 수정하세요",$menuName.innerText);
            this.menu[this.currentCategory][menuId].name = updatedMenuName;
            console.log(this.menu);
            store.setLocalStorage(this.menu);
            $menuName.innerText = updatedMenuName;
    }
    
    const removeMenuName = (e) => {
        if(confirm("정말 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId;
            this.menu[this.currentCategory].splice(menuId,1);
            store.setLocalStorage(this.menu);
            e.target.closest("li").remove();
            updateMenuCount();
            }
    }

    $('#menu-list').addEventListener("click",(e) => {
        //target으로 element를 확인 할 수 있다. 부모 태그를 잡아 이벤트리스너로 이벤트를 위임할 수 있다.
        //부모 하위에 있는 엘레멘트들에 클릭을 모두 감지함
        if (e.target.classList.contains('menu-edit-button')){
            //const menuName = e.target.previousElementSibling.innerText;
            updateMenuName(e);
        }

        if(e.target.classList.contains('menu-remove-button')){
            removeMenuName(e);
            }
    });

    // form 태그가 전송되는것을 막아준다.
    $('#menu-form').addEventListener("submit",(e) =>{
        //preventDefault 기존 이벤트를 막는 메서드
        e.preventDefault();
    })

    
    $('#menu-name').addEventListener("keypress",(e) => {
        if(e.key !== 'Enter'){
            return;
        }
        addMenuName();
    });

    $('#menu-submit-button').addEventListener("click",addMenuName);

    $('nav').addEventListener("click", (e) => {
        const isCategoryButton = e.target.classList.contains("cafe-category-name");
        if(isCategoryButton){
            const categoryName = e.target.dataset.categoryName;
            this.currentCategory = categoryName;
            $('#categoryTitle').innerText = e.target.innerText;
            render();
        }
    })
}

    

const app = new App();
app.init();