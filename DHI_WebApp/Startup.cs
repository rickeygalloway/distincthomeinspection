using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DHI_WebApp.Startup))]
namespace DHI_WebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
