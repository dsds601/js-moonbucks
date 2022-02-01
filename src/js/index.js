//요구사항
//step1
//TODO 메뉴 추가
// 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
//  메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
//  사용자 입력값이 빈 값이라면 추가되지 않는다.
// TODO 수정
//  메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다. -> 모달창이 뜨떠서 이름을 받음
//  메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.

// TODO 삭제
    //TODO 삭제 버튼
    // 메뉴 삭제버튼 클릭 이벤트 -> 삭제 컨펌 모달
    // 확인 -> 삭제
    // 삭제 후 총 갯수

// $ 표시는 html에 DOM element를 가져올때 관용적으로 사용합니다. 
// 람다식 => 한줄이면 바로 리턴값이 나옵니다.
const $ = (selector) => document.querySelector(selector);

function App(){

    const updateMenuCount = () => {
        $(".menu-count").innerText = `총 ${$("#espresso-menu-list").querySelectorAll("li").length}개`;
    }
    
    $('#espresso-menu-list').addEventListener("click",(e) => {
        //target으로 element를 확인 할 수 있다. 부모 태그를 잡아 이벤트리스너로 이벤트를 위임할 수 있다.
        //부모 하위에 있는 엘레멘트들에 클릭을 모두 감지함
        if (e.target.classList.contains('menu-edit-button')){
            //const menuName = e.target.previousElementSibling.innerText;
            //closest 제일 가까운 리스 태그 찾는다 그 엘레멘트속 menu- name 을 찾는다.
            const $menuName = e.target.closest("li").querySelector(".menu-name"); 
            //prompt 반환값 -> 수정된 value
            const updatedMenuName = prompt("메뉴명을 수정하세요",$menuName.innerText);
            $menuName.innerText = updatedMenuName;
        }

        if(e.target.classList.contains('menu-remove-button')){
            if(confirm("정말 삭제하시겠습니까?")) {
                e.target.closest("li").remove();
                updateMenuCount();
            }
        }
    });

    // form 태그가 전송되는것을 막아준다.
    $('#espresso-menu-form').addEventListener("submit",(e) =>{
        //preventDefault 기존 이벤트를 막는 메서드
        e.preventDefault();
    })

    const addMenuName = () =>{
        if($('#espresso-menu-name').value.trim() === ''){
            alert("입력값이 빈 값입니다.");
            return;
        }
        const espressoMenuName = $('#espresso-menu-name').value;
        const menuItemTemplate = (espressoMenuName) => {return `
        <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
        };
        $('#espresso-menu-list').insertAdjacentHTML(
            "beforeend",
            menuItemTemplate(espressoMenuName)
        );
        updateMenuCount();
        $('#espresso-menu-name').value ='';
    };

    $('#espresso-menu-name').addEventListener("keypress",(e) => {
        if(e.key === 'Enter'){
            addMenuName();
        }
    })

    $('#espresso-menu-submit-button').addEventListener("click",() => {
        addMenuName();
    });
}

App();