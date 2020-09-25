const URL = 'https://www.instagram.com/tr44st/' + '?__a=1';
const selector = document.getElementById('insta');
const account = document.getElementById('account');

const showInstagramPost = (
  selector,
  iamgeSRC,
  accountName,
  descriptionText,
  likedByCount,
  commentsCount
) => {
  selector.innerHTML += `
    <div class="row mr-0 ml-0 justify-content-center">
      <div class="col-sm-6">
        <div class="card mt-5 mb-5">
            <img class="card-img-top" src='${iamgeSRC}' alt='' />
            <h5 class="card-title pt-4 pl-4 pb-0 mb-1 font-weight-bold">${accountName}</h5>
            <p class="card-text text-justify pr-4 pl-4 pt-2 mb-1">${likedByCount} 
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
              ${commentsCount}
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
              </svg></p>
            <p class="card-text text-justify pr-4 pl-4 pb-4">${descriptionText}</p>
        </div>
      </div>
    </div>
  `;
};

const displayFeed = (posts, accountName) => {
  posts.forEach((post) => {
    let displayURL = post.node.display_url;
    let description = post.node.edge_media_to_caption.edges[0].node.text;
    let likedByCount = post.node.edge_liked_by.count;
    let commentsCount = post.node.edge_media_to_comment.count;
    showInstagramPost(
      selector,
      displayURL,
      accountName,
      description,
      likedByCount,
      commentsCount
    );
  });
};

const displayAccount = (accountName) => {
  account.innerHTML = `<span class="badge badge-dark"><a href="https://www.instagram.com/${accountName}/" class="nounderline">@${accountName}</a></span>`;
};

fetch(URL)
  .then((response) => response.json())
  .then((response) => {
    let posts = response.graphql.user.edge_owner_to_timeline_media.edges;
    let accountName = response.graphql.user.username;
    displayAccount(accountName);
    displayFeed(posts, accountName);
  })
  .catch((error) => console.error('error:', error));
