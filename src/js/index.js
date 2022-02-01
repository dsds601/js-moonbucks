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
        localStorage.getItem("menu");
    },
};

function App(){
// 상태란? 변할 수 있는 데이터 (관리 필요)
// - 갯수 , 메뉴명
    this.menu = [];

    const updateMenuCount = () => {
        $(".menu-count").innerText = `총 ${$("#espresso-menu-list").querySelectorAll("li").length}개`;
    }

    const addMenuName = () =>{
        if($('#espresso-menu-name').value.trim() === ''){
            alert("입력값이 빈 값입니다.");
            return;
        }
        const espressoMenuName = $('#espresso-menu-name').value;
        //menu 상태에 메뉴를 추가함
        this.menu.push({ name: espressoMenuName });
        store.setLocalStorage(this.menu);
        // -> '[{"name":"americano"},{"name":"latter"}]'
        const template = this.menu.map(item => {
            return `
            <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${item.name}</span>
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

        $('#espresso-menu-list').innerHTML = template;
        updateMenuCount();
        $('#espresso-menu-name').value ='';
    };

    const updateMenuName = (e) =>{
            
            //closest 제일 가까운 리스 태그 찾는다 그 엘레멘트속 menu- name 을 찾는다.
            const $menuName = e.target.closest("li").querySelector(".menu-name"); 
            //prompt 반환값 -> 수정된 value
            const updatedMenuName = prompt("메뉴명을 수정하세요",$menuName.innerText);
            $menuName.innerText = updatedMenuName;
    }
    
    const removeMenuName = (e) => {
        if(confirm("정말 삭제하시겠습니까?")) {
            e.target.closest("li").remove();
            updateMenuCount();
            }
    }

    $('#espresso-menu-list').addEventListener("click",(e) => {
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
    $('#espresso-menu-form').addEventListener("submit",(e) =>{
        //preventDefault 기존 이벤트를 막는 메서드
        e.preventDefault();
    })

    
    $('#espresso-menu-name').addEventListener("keypress",(e) => {
        if(e.key !== 'Enter'){
            return;
        }
        addMenuName();
    });

    $('#espresso-menu-submit-button').addEventListener("click",addMenuName);
}

const app = new App();