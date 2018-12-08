using Autofac;
using Tempocracy.Domain;

namespace Tempocracy.Infrastructure
{
    public class InfrastructureModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<AppQueryContext>().As<IAppQueryContext>().InstancePerLifetimeScope();
            builder.RegisterType<AppCommandContext>().As<IAppCommandContext>().InstancePerLifetimeScope();
        }
    }
}
