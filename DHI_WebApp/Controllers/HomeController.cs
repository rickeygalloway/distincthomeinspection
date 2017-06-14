using System.Web.Mvc;

namespace DHI_WebApp.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult About()
		{
			return View();
		}

		public ActionResult Contact()
		{
			//ViewBag.Message = "Your contact page.";
			//ViewBag.Title = "Contact | " + _title;
			return View();
		}
		public ActionResult Services()
		{
			return View();
		}
		public ActionResult Maintenance()
		{
			return View();
		}
	}
}