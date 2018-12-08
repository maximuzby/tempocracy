using Autofac;
using Tempocracy.Domain;
using Tempocracy.Infrastructure.Database;

namespace Tempocracy.Infrastructure
{
    public class InfrastructureModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<AppQueryContext>().As<IAppQueryContext>().InstancePerLifetimeScope();
            builder.RegisterType<AppCommandContext>().As<IAppCommandContext>().InstancePerLifetimeScope();
            builder.RegisterType<MongoDbContext>().As<IMongoDbContext>().SingleInstance();
        }
    }
}
