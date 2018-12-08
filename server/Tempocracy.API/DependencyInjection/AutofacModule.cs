using Autofac;
using Tempocracy.Domain;
using Tempocracy.Infrastructure;

namespace Tempocracy.API.DependencyInjection
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<DomainModule>();
            builder.RegisterModule<InfrastructureModule>();
        }
    }
}
