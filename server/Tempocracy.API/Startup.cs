using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Tempocracy.Domain;
using Tempocracy.Infrastructure;

namespace Tempocracy.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddCors();
            services.AddRouting(options => options.LowercaseUrls = true);
            services.Configure<ConnectionOptions>(Configuration);
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Tempocracy API", Version = "v1" });
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.Register(p => new ConnectionOptions
            {
                ConnectionString = Configuration.GetValue<string>("ConnectionString")
            }).SingleInstance();
            builder.RegisterModule<DomainModule>();
            builder.RegisterModule<InfrastructureModule>();
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSwagger(c => { c.RouteTemplate = "api/docs/{documentName}/swagger.json"; });
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/api/docs/v1/swagger.json", "Tempocracy API V1");
                c.RoutePrefix = "api/docs";
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            // Allow requests from local Front-end project.
            app.UseCors(builder =>
                builder.WithOrigins("http://localhost:3000"));

            //app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
