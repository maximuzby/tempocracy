using System;
using System.Collections.Generic;
using System.Text;

namespace Tempocracy.Domain.Queries
{
    public interface IQuery<in TQueryArgs, out TQueryResult>
    {
        TQueryResult Run(TQueryArgs args, IAppQueryContext context);
    }
}
