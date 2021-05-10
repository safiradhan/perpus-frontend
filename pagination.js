function getUrl(start = 0) {
    return 'http://127.0.0.1:5000/users/?start=' + start + '&limit=5';
  } 
  const list_element = document.getElementById('list');
  const pagination_element = document.getElementById('pagination');
  let current_page = 3;
  let rows = 2;
  function getData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => loadDataIntoTable(data))
        .catch(err => console.log(err));
  }

  function DisplayList (items, wrapper, rows_per_page, page) {
      wrapper.innerHTML = "";
      page--;
      let start = rows_per_page * page;
      let end = start * rows_per_page;
      let paginationedItems = itemEmail.slice(start, end);
      
      for (let i = 0; i < paginationedItems.length; i++) {
          let item = items[i];

          let item_element = document.createElement('div');
          item_element.classList.add('item');
          item_element.innerText = item;

          wrapper.appendChild(item_element);
      }
    //   for (let i = loop_start; i < loop_start + rows_per_page: i++) {

    function SetupPageination (items, wrapper, rows_per_page) {
        wrapper.innerHTML = "";
        let page_count = Math.ceil(items.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
            paginationButton(i, items);
        }
    }
    function paginationButton (page) {
        let button = document.createElement('button');
        button.innerText = page;
        if (current_page == page) button.classList.add('active');
        return button;
    }
  }
  function loadDataIntoTable(data) {
    let itemID = [];
    let itemName = [];
    let itemEmail = [];
    let itemPassword = [];
  
    let sortid = data.sort((a,b) => a.user_id - b.user_id)
    sortid.forEach((item) => {
        itemID.push(item.user_id);
        itemName.push(item.full_name);
        itemEmail.push(item.email);
        itemPassword.push(item.password);
    });
  
    let tableBody = document.getElementById('crypto-table-body');
  
    let html = "";
  
    for(let i = 0; i < itemName.length; i++) {
        html += "<tr>";
        html += "<td>" + itemID[i] + "</td>";
        html += "<td>" + itemName[i] + "</td>";
        html += "<td>" + itemEmail[i] + "</td>";
        html += "<td>" + itemPassword[i] + "</td>";
        html += "</tr>";
    }
  
    tableBody.innerHTML = html;
  }
  
  function handleNumberClick(clickedLink, leftArrow, rightArrow) {
    clickedLink.parentElement.classList = "active";
    let clickedLinkPageNumber = parseInt(clickedLink.innerText);
    const url = getUrl((clickedLinkPageNumber * 5) - 5);
    getData(url);
  
    switch(clickedLinkPageNumber) {
        case 1:
            disableLeftArrow(rightArrow);
            if (rightArrow.className.indexOf('disabled') !== -1) {
                enableRightArrow(rightArrow);
            }
            break;
        case 5:
            disableRightArrow(rightArrow);
            if (leftArrow.className.indexOf('disabled') !== -1) {
                enableLeftArrow(leftArrow);
            }
            break;
        default:
            if (leftArrow.className.indexOf('disabled') !== -1) {
                enableLeftArrow(leftArrow);
            }
            if (rightArrow.className.indexOf('disabled') !== -1) {
                enableRightArrow(rightArrow);
            }
            break;
    }
  }
  
  function handleLeftArrowClick(activePageNumber, leftArrow, rightArrow) {
    //move to previous page
    let previousPage = document.querySelectorAll('li')[activePageNumber-1];
    previousPage.classList = "active";
    url = getUrl(((activePageNumber-1) * 5) - 5);
    getData(url);
    
    if (activePageNumber === 5) {
        enableRightArrow(rightArrow);
    }
  
    if (activePageNumber - 1 === 1) {
        disableLeftArrow(leftArrow);
    }
  }
  
  function handleRightArrowClick(activePageNumber, leftArrow, rightArrow) {
    //move to next page
    let nextPage = document.querySelectorAll('li')[activePageNumber+1];
    nextPage.classList = "active";
  
    url = getUrl(((activePageNumber+1) * 5) - 5);
    getData(url);
  
    if (activePageNumber === 1) {
        enableLeftArrow(leftArrow);
    }
  
    if (activePageNumber + 1 === 5) {
        disableRightArrow(rightArrow);
    }
  }
  
  function disableLeftArrow(leftArrow) {
    leftArrow.classList = "disabled arrow-left";
  }
  
  function enableLeftArrow(leftArrow) {
    leftArrow.classList = "waves-effect arrow-left";
  }
  
  function disableRightArrow(rightArrow) {
    rightArrow.classList = "disabled arrow-right";
  }
  
  function enableRightArrow(rightArrow) {
    rightArrow.classList = "waves-effect arrow-right";
  }
  
  function init() {
    const url = getUrl();
    getData(url);
  }
  
  init();
  
  //handle pagination
  let pageLinks = document.querySelectorAll('a');
  let activePageNumber;
  let clickedLink;
  let leftArrow;
  let rightArrow;
  let url = '';
  
  pageLinks.forEach((element) => {
    element.addEventListener("click", function() {
        leftArrow = document.querySelector('.arrow-left');
        rightArrow = document.querySelector('.arrow-right');
        console.log(rightArrow);
        activeLink = document.querySelector('.active');
  
        //get active page number 
        activePageNumber = parseInt(activeLink.innerText);
  
        if ((this.innerText === 'chevron_left' && activePageNumber === 1) || (this.innerText === 'chevron_right' && activePageNumber === 5)) {
            return;
        }
  
        //update active class
        activeLink.classList = "waves-effect";
  
        if (this.innerText === 'chevron_left') {
            handleLeftArrowClick(activePageNumber, leftArrow, rightArrow);
        } else if (this.innerText === 'chevron_right') {
            handleRightArrowClick(activePageNumber, leftArrow, rightArrow);
        } else {
            handleNumberClick(this, leftArrow, rightArrow);
        }
  
    });
  });
  