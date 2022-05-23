const { Hateoas } = require("#core/http/hateoas");

const userLinks = (path, resource) => [
  { rel: "self", type: "GET", href: `${path}/${resource.id}` },
  { rel: "deleteUser", type: "DELETE", href: `${path}/${resource.id}` },
  { rel: "updateUser", type: "PUT", href: `${path}/${resource.id}` },
  { rel: "promoteToAdmin", type: "PATCH", href: `${path}/${resource.id}/promote` },
];

const listUsersHateoas = Hateoas.paginate({
  resource: {
    links: userLinks,
  },
});

const userHateoas = Hateoas.links({
  resource: {
    links: userLinks,
  },
});


module.exports = { listUsersHateoas, userHateoas };
