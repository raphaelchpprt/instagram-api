const URL = "https://www.instagram.com/traastagram/" + "?__a=1";
const selector = document.getElementById("insta");
const account = document.getElementById("account");

const showInstagramPost = (
  selector,
  iamgeSRC,
  accountName,
  descriptionText
) => {
  selector.innerHTML += `
    <div class="row justify-content-center">
      <div class="col-sm-5 col-lg-6 m-4">
        <div class="card mt-5">
            <img class="card-img-top" src='${iamgeSRC}' alt='' />
            <h5 class="card-title pt-4 pl-4 pb-0 mb-0 font-weight-bold">${accountName}</h5>
            <p class="card-text text-justify pr-4 pl-4 pb-4 pt-3">${descriptionText}</p>
        </div>
      </div>
    </div>
  `;
};

const displayFeed = (posts, accountName) => {
  posts.forEach((post) => {
    let displayURL = post.node.display_url;
    let description = post.node.edge_media_to_caption.edges[0].node.text;
    showInstagramPost(selector, displayURL, accountName, description);
  });
};

const displayAccount = (accountName) => {
  account.innerHTML = `<span class="badge badge-dark">@${accountName}</span>`;
};

fetch(URL)
  .then((response) => response.json())
  .then((response) => {
    let posts = response.graphql.user.edge_owner_to_timeline_media.edges;
    let accountName = response.graphql.user.username;
    displayAccount(accountName);
    displayFeed(posts, accountName);
  })
  .catch((error) => console.error("error:", error));
