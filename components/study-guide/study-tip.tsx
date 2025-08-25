"use client";

const StudyTip = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-orange-800 mb-3 flex items-center gap-2">
        <span className="text-xl">💡</span>
        Study Tip
      </h4>
      <div className="space-y-2">
        <p className="text-orange-700 leading-relaxed">
          Take your time to understand each key point. Consider how these rules
          apply to real driving situations you might encounter on Ontario roads.
        </p>
        <div className="bg-orange-100 rounded-lg p-3 mt-3">
          <p className="text-orange-800 text-sm font-medium">
            📚 Pro Tip: Review this section multiple times and try to explain
            the concepts in your own words to ensure understanding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyTip;
