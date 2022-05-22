const { Hateoas } = require("#core/http/hateoas");

const customerLinks = (path, resource) => [
  { rel: "self", type: "GET", href: `${path}/${resource.id}` },
  { rel: "deleteCustomer", type: "DELETE", href: `${path}/${resource.id}` },
  { rel: "updateCustomer", type: "PUT", href: `${path}/${resource.id}` },
  { rel: "uploadPhoto", type: "PATCH", href: `${path}/${resource.id}/photo` },
];

const listCustomersHateoas = Hateoas.paginate({
  resource: {
    links: customerLinks,
  },
});

const customerHateoas = Hateoas.links({
  resource: {
    links: customerLinks,
  },
});


module.exports = { listCustomersHateoas, customerHateoas };
