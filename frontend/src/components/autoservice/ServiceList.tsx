import React from "react";

export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  icon: JSX.Element;
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-5" style={{ color: "var(--color-text)" }}>
        Наши услуги
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="glass rounded-2xl p-5 flex items-start gap-4 group hover:scale-[1.01] transition-transform duration-200"
          >
            
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(243,193,95,0.12)", color: "#F3C15F" }}
            >
              {service.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold mb-1" style={{ color: "var(--color-text)" }}>
                {service.title}
              </h3>
              <p className="text-sm text-dark-300 mb-3">{service.description}</p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(243,193,95,0.15)", color: "#F3C15F" }}
                >
                  💰 {service.price}
                </span>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full text-dark-300"
                  style={{ background: "var(--bg-card-deep)" }}
                >
                  ⏱ {service.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceList;
