const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    }
    ,
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

function parseElement(item) {
  let li = document.createElement('li');
  let i = document.createElement('i');
  i.classList.add('material-icons');
  if(item.folder === undefined) { 
    li.appendChild(i);
    li.classList.add('g-file');    
    i.innerHTML = 'insert_drive_file';
    li.innerHTML += item.title;
  } else {
    li.classList.add('g-folder');
    i.innerHTML = 'folder';
    let span = document.createElement('span');
    span.appendChild(i);
    span.classList.add('folder-title');
    li.appendChild(span);
    span.innerHTML += item.title;
  }
  return li;
}

function createStructure(root, structure) {
  let mainUl = document.createElement('ul');
  mainUl.classList.add('g-filesystem');
  structure.forEach(item => {
    let li = parseElement(item);
    mainUl.appendChild(li);
    if(item.children){
      createStructure(li, item.children);
    } 
  }
  )
  root.appendChild(mainUl);
}
const rootNode = document.getElementById('root');
createStructure(rootNode, structure);

let toggler = document.getElementsByClassName('folder-title');
let list = document.getElementsByClassName('g-filesystem');

list[0].classList.remove('g-filesystem');
for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener('click', function() {
    this.parentElement.querySelector('.g-filesystem').classList.toggle('active');
    const icon = this.querySelector('.material-icons');
    icon.innerHTML === 'folder' ? icon.innerHTML = 'folder_open' : icon.innerHTML = 'folder';
  })
}