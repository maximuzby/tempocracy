using Autofac;
using Tempocracy.Domain.Commands;
using Tempocracy.Domain.Queries;
using Tempocracy.Domain.Services;

namespace Tempocracy.Domain
{
    public class DomainModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(ThisAssembly)
                .AsClosedTypesOf(typeof(IQueryHandler<,>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(ThisAssembly)
                .AsClosedTypesOf(typeof(ICommandHandler<>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(ThisAssembly)
                .AssignableTo<IService>()
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}
