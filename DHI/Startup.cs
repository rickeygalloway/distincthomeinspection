using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DHI.Startup))]
namespace DHI
{
	public partial class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			// ConfigureAuth(app);
		}
	}
}
