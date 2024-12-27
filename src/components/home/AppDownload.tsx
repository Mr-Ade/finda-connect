export const AppDownload = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="pr-0 lg:pr-12">
            <span className="bg-red-50 text-primary px-3 py-1 rounded inline-block mb-4">
              Download apps
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Download the Goodup App<br />For Easy Use
            </h2>
            <p className="text-gray-600 mb-8">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <h3 className="text-primary font-bold text-2xl mb-1">10k+</h3>
                <p className="font-medium">Active Jobs</p>
              </div>
              <div>
                <h3 className="text-primary font-bold text-2xl mb-1">12k+</h3>
                <p className="font-medium">Resumes</p>
              </div>
              <div>
                <h3 className="text-primary font-bold text-2xl mb-1">7k+</h3>
                <p className="font-medium">Employers</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#" className="inline-block">
                <img src="/assets/img/ios.png" alt="App Store" className="h-14" />
              </a>
              <a href="#" className="inline-block">
                <img src="/assets/img/and.png" alt="Play Store" className="h-14" />
              </a>
            </div>
          </div>
          
          <div>
            <img src="/assets/img/app.png" alt="App Preview" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};