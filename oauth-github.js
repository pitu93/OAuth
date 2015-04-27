var repoHTML = "<input type='text' name='user' value='pitu93' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' value='GitHub-API' " +
    "id='repo' size='10' />" +
    "<button id='repobutton' type='button'>Grab repo data</button>" +
    "<div id='repodata'/>";

var github;
var myrepo;

function getToken() {
    var token = $("#token").val();
    console.log (token);

    github = new Github({
	token: token,
	auth: "oauth"
    });

    $("#repoform").html(repoHTML)
    $("div#form button").click(getRepo);
};

function getRepo() {
    var user = $("#user").val();
    var reponame = $("#repo").val();
    myrepo = github.getRepo(user, reponame);
    myrepo.show(showRepo);
};

function showRepo(error, repo) {
    var repodata = $("#repodata");
    if (error) {
	repodata.html("<p>Error code: " + error.error + "</p>");
    } else {
	repodata.html("<p>Repo data:</p>" +
		      "<ul><li>Full name: " + repo.full_name + "</li>" +
		      "<li>Description: " + repo.description + "</li>" +
		      "<li>Created at: " + repo.created_at + "</li>" +
		      "</ul><button type='button' id='write'>" +
		      "Write File!</button>" +
		      "<button type='button' id='read'>" +
		      "Read File!</button>" +
		      "<div id='readfile' />");
	console.log (repo.full_name, repo.description, repo.created_at);
	$("#write").click(writeFile);
	$("#read").click(readFile);
    }
};

function writeFile() {
    myrepo.write('master', 'datafile', new Date().toLocaleString(),"Updating data");
};

function readFile() {
    myrepo.read('master', 'datafile', function( data) {
	$("#readfile").html("<p>Contents:</p><p>" + data + "</p>");
    });
};

$(document).ready(function() {
    hello.init({
	github : "ce3c953f60a56d8f1275"
    },{
	redirect_uri : 'redirect.html',
	oauth_proxy : "https://auth-server.herokuapp.com/proxy"
    });
    git = hello("github");
    git.login({response_type: 'code'}).then( function(){
	auth = hello("github").getAuthResponse();
	token = auth.access_token;
	github = new Github({
	    token: token,
	    auth: "oauth"
	});
	$("#repoform").html(repoHTML);
	$("#repobutton").click(getRepo);
    });
});
