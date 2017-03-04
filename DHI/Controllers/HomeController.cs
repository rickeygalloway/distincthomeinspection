using System.Web.Mvc;

namespace DHI.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}
		public ActionResult Services()
		{
			ViewBag.Message = "Services Here.";

			return View();
		}
		public ActionResult Maintenance()
		{
			ViewBag.Message = "Maintenance Tips Here";

			return View();
		}
	}
}