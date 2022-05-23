const { ResponseData } = require("./response");

const links = (options) => (request, response) => {
  const { data } = response.body;
  if (!data) {
    return response;
  }
  return ResponseData({
    ...response,
    body: {
      data,
      links: resourceLinks(request.path, data, options),
    },
  });
};

const paginate =
  (options = {}) =>
  (request, response) => {
    if (!Array.isArray(response.body.data)) {
      return response;
    }
    const links = paginateLinks(request, response.body.data);
    const data = hydrateResourcesWithLinks(
      request.path,
      response.body.data,
      options
    );
    return ResponseData({
      ...response,
      body: {
        data,
        links,
      },
    });
  };

const paginateLinks = ({ path, query }, data) => {
  const links = [];
  const page = Number(query.page) || 1;
  query = new URLSearchParams(query);

  if(data.length){
    query.set("page", page)
    const self = {
      rel: "self",
      type: "GET",
      href: `${path}?${query.toString()}`,
    };
    links.push(self);
  }

  if (page > 1) {
    query.set("page", page - 1);
    const prev = {
      rel: "prev",
      type: "GET",
      href: `${path}?${query.toString()}`,
    };
    links.push(prev);
  }

  if(data.length){
    query.set("page", page + 1);
    const next = {
      rel: "next",
      type: "GET",
      href: `${path}?${query.toString()}`,
    };
    links.push(next);
  }

  return links;
};

const hydrateResourcesWithLinks = (path, resources, options) => {
  return resources.map((resource) => ({
    ...resource,
    links: resourceLinks(path, resource, options),
  }));
};

const resourceLinks = (path, resource, options) => {
  return options.resource.links(path, resource);
};

const Hateoas = { paginate, links };

module.exports = { Hateoas };
