using Defontana.Prueba.Backend.Domain.Database.Repositories;

namespace Defontana.Prueba.Backend.Domain.Database
{
    
    public abstract class DataSourceCustom
    {
        private Dictionary<Type, Func<IRepository>> repositoryFactories = new Dictionary<Type, Func<IRepository>>();
        public T BuildRepository<T>()
        {
            Type type = typeof(T);

            if (repositoryFactories.ContainsKey(type))
            {
                return (T) repositoryFactories[type]();
            }

            throw new NotImplementedException();
        }

        public DataSourceCustom()
        {
            
        }

        protected abstract void InitFactory();

        protected void RegisterRepository<TRepository, TImplementation>(params object[] constructorArgs)
            where TRepository : IRepository
            where TImplementation : TRepository
        {
            repositoryFactories[typeof(TRepository)] = () => (TRepository) Activator.CreateInstance(typeof(TImplementation), constructorArgs);
        }



    }
}
