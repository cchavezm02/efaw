package pe.edu.upc.demo3798api.servicesinterfaces;

public class CORS {
    //	@Override

//	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)

// throws IOException, ServletException {

// HttpServletResponse response = (HttpServletResponse) res;

// HttpServletRequest request = (HttpServletRequest) req;

//

// String origin = request.getHeader("Origin");

// String method = request.getMethod();

//

// if (!"http://localhost:4200".equals(origin)) {

// response.sendError(HttpServletResponse.SC_FORBIDDEN, "Origin not allowed");

// return;

// }

//

//

// response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

// //response.setHeader("Access-Control-Allow-Methods", "DELETE, GET, OPTIONS, PATCH, POST, PUT");

// response.setHeader("Access-Control-Allow-Methods", "GET");

// response.setHeader("Access-Control-Max-Age", "3600");

// response.setHeader("Access-Control-Allow-Headers",

// "x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN");

//

//

//

// if ("OPTIONS".equalsIgnoreCase(method)) {

// response.setStatus(HttpServletResponse.SC_OK);

// } else if (!"GET".equalsIgnoreCase(method)) {

// // Rechazar explícitamente métodos distintos de POST

// response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "Only GET is allowed");

// } else {

// chain.doFilter(req, res);

// }

//

//	}
}
